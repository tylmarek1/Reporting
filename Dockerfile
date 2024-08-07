FROM node:16.15.0-alpine as build

#ENV NODE_ENV production #TODO: Commented out - same as npm install --production, causes missing env-cmd
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/Utils/node_modules/.bin:$PATH

ARG NPM_TOKEN
ARG BUILD_NUMBER
ARG RevisionNumber=1
ENV REACT_APP_VERSION $BUILD_NUMBER

WORKDIR /app/reporting
COPY ["reporting/package.json", "reporting/package-lock.json", "reporting/npm-shrinkwrap.json*", "./"]
# Did not work when added to ~/.npmrc, but in single file in /webcontainer does. It works on windows too, if insterted directly into .npmrc file.
# NPM_TOKEN is in docker-compose and it is token generated in azure dev ops under my account and encoded into base64.
RUN echo "@elx-element:registry=https://pkgs.dev.azure.com/ELXBLUE/Element.Standard/_packaging/NpmFeed/npm/registry/" >> ~/.npmrc
RUN echo "always-auth=true" >> ~/.npmrc
RUN echo "; begin auth token" >> ~/.npmrc
RUN echo "//pkgs.dev.azure.com/ELXBLUE/Element.Standard/_packaging/NpmFeed/npm/registry/:username=ppeknica" >> ~/.npmrc
RUN echo "//pkgs.dev.azure.com/ELXBLUE/Element.Standard/_packaging/NpmFeed/npm/registry/:_password="${NPM_TOKEN} >> ~/.npmrc
RUN echo "; end auth token" >> ~/.npmrc

# Install dependencies including canvas
RUN apk add --no-cache build-base g++ cairo-dev pango-dev jpeg-dev giflib-dev

#Looks like this works if docker sometimes says: npm ERR! Maximum call stack size exceeded. Package-lock.json delete might help, but not tried
#RUN npm cache clean --force 

RUN npm ci 

WORKDIR /app 
COPY . .

WORKDIR /app/reporting

# instalace https://stedolan.github.io/jq/ - pro upravy .json
RUN apk add jq

# vytazeni cisla verze ze souboru package.json
RUN jq '.version' package.json > tmpVersion.txt

# nahrazení výrazu "111.222.333" (včetně uvozovek) za 111.222 přes příkaz sed - https://www.tutorialspoint.com/unix/unix-regular-expressions.htm
RUN sed -i -E 's/"(\d+).(\d+).(\d+)"/\1.\2/' tmpVersion.txt

# nastaveni verze aplikace (načteme verzi z tmp souboru a připlácneme revision number)
RUN npm version $(cat tmpVersion.txt).${RevisionNumber}

# uprava interface.json - pridame verzi aplikace a číslo buildu
RUN jq --arg package_version "$(cat tmpVersion.txt).${RevisionNumber}" --arg build_number "$BUILD_NUMBER" '.version = $package_version | .buildNumber = $build_number' 

RUN npm run build

RUN rm -f tmpVersion.txt

# Runtime stage
FROM node:16.15.0-alpine as run
# Install runtime dependencies
RUN apk add --no-cache cairo pango jpeg giflib
# Create and copy foldes with node permissions
COPY --chown=node:node --from=build /app/reporting /app/reporting
WORKDIR /app/reporting
COPY reporting/src/assets/fonts/TimesNewRoman/ /app/reporting/build/assets/fonts/TimesNewRoman/
ENV NODE_ENV production 
# Unprivileged port default 3001
EXPOSE 3001
# default nonroot user
USER node
CMD ["npm", "run", "serve:build"]