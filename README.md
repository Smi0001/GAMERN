# GAMERN
Full stack implementation of GAMERN (GraphiQL Apollo MongoDB ExpressJS ReactJS NodeJS)


### Download git repo
`git clone git@github.com:Smi0001/GAMERN.git`


### Run UI server
Using npm
```
cd client
npm install
npm start
```
Using yarn
```
cd client
yarn
yarn start
```

Dev. can access [Homepage](http:localhost:3000/) at port 3000.


### Run API server
Using npm
```
cd server
npm install
npm start
```

Using yarn
```
cd server
yarn
yarn start
```

If using nodemon in dev env:
```
nodemon app
```


Dev. can access [GraphiQL UI](http:localhost:4000/graphql) for DB handling at port 4000.

For backend development we can execute `nodemon app` that watches for modifications in backend code and restarts server.


### Deploy on heroku
1. Create build of client module `npm run build --prefix ./client`
2. Copy the build directory into server/public `cp -r ./client/build ./server/public`
3. Push changes to heroku, Procfile containing command to run server/app.js run the server and static: public/index.html `node app.js`


### Note
To search images, internet is required


### Reference
`React`
 - [MDB React ![MDB React](https://mdbootstrap.com/img/Marketing/general/logo/small/mdb-react.png)](https://mdbootstrap.com/docs/react)

`Image Editor`
- [Github Code](https://github.com/nhn/tui.image-editor/blob/v3.8.0/src/js/imageEditor.js) https://github.com/nhn/tui.image-editor
- [API Dox ![Documentation](https://user-images.githubusercontent.com/35218826/40895380-0b9f4cd6-67ea-11e8-982f-18121daa3a04.png)](https://nhn.github.io/tui.image-editor/latest/ImageEditor)

`GraphQl`
- [Github Code](https://github.com/iamshaunjp/graphql-playlist) https://github.com/iamshaunjp/graphql-playlist
- [Tutorial Playlist ![YouTube](https://s.ytimg.com/yts/img/favicon_48-vflVjB_Qk.png)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)

`Google Image Search plugin`
- [image-search-google ![npmjs](https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png)](https://www.npmjs.com/package/image-search-google)


### License
Every tool of this product is open source with their [license](./License.txt)
