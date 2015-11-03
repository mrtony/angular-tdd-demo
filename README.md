Augular TDD example
===
# 術語

### mocha
mocha是一個test framework, 與Jasmine是相同的

### karma
是一個基於node.js的javascript測試執行過程管理工具(Test Runner)

### Chai
Chai is a BDD / TDD assertion library

---

# CH02
### 0202-App Setup
1. `npm init`
2. `bower init`
3. `bower install angular --save-dev`
4. add `.gitignore` file
5. 建立`gulpfile.js`
6. 安裝local gulp : `npm install --save gulp`
7. 安裝global gulp : `npm install gulp -g`
8. 安裝browser-sync: `npm install --save browser-sync`
9. 完成gulpfile.js
10. 完成後, 到console輸入`gulp serve`

gulpfile.js
```
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
	browserSync.init({
		notify: false,
		port: 8080,
		server: {
			baseDir: ['app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
	
	gulp.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
	
});
```


### 0203-Serving Mocha
1. `bower install --save mocha chai`
2. 在`<test>`中建立`main.spec.js`, 用來寫test case
3. 在`<test>`中建立`index.html`, 用來建立測試的首頁 - 這個很重要，要先照目前的順序來建立此頁
4. 在`gulpfile.js`中建立`serve-test`的task, 以用來執行測試
5. 執行`gulp serve-test`, 可看到執行結果

test/index.html
```
<head>
	<title>Mocha Spec Runner</title>
	<link rel="stylesheet" href="bower_components/mocha/mocha.css"></link>	
</head>

<body>
	<div id="mocha"></div>
	<h1>Hello World!</h1>
	<script src="bower_components/mocha/mocha.js"></script>
	<script src="bower_components/chai/chai.js"></script>
	
	<script>
		mocha.setup('bdd');
	</script>	
	<script src="main.spec.js"></script>
	<script>
		mocha.run();
	</script>
</body>
```

gulpfile.js新增
```
gulp.task('serve-test', function() {
	browserSync.init({
		notify: false,
		port: 8081,
		server: {
			baseDir: ['test', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
	
	gulp.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
	
});
```

### 0204 - Running Karma test
1. 安裝karma, `npm install --save karma mocha` , 而現在bower, npm都有裝mocha, 但沒有關係。
2. 安裝global karma, `npm install karma -g`
3. 建立`karma.conf.js`
4. 安裝karma-mocha, `npm install --save karma-mocha`
5. 在gulpfile.js中加入使用karma的task
6. 執行`gulp test-browser`後，會出現訊息說沒有裝`PhantomJS`, 安裝它: `npm install --save-dev karma-phantomjs-launcher`
7. 執行`gulp test-browser`後還是沒有執行成功，再安裝global的套件: `npm install -g karma-mocha karma-phantomjs-launcher`
8. 執行`karma start`, 可以看到karma和phantomjs都正常. 按ctrl-c結束。
9. 執行`gulp test-browser`, 不會顯示錯誤，但也是沒有輸出什麼. 要繼續安裝backend server才會正常動作。

```
var karma = require('karma').server;

gulp.task('test-browser', function() {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		reporters: ['mocha']
	});
});
```


### 0205 - Implementing a Simple Back End With Express
裝不少套件，主要是要讓gulp可以同時讓前後台server可同時執行。
1. 安裝express. 執行`npm install --save express`
2. 建立`server.js`, 提供contacts的json資料, 並listen port 9001, 然後執行 `node server.js`
3. 安裝`npm install --save gulp-live-server`
4. 在gulpfile.js中用gulp-live-server建立一個`server`的task.
5. 在原本建好的`serve`的task, 加入一個同時執行旳server task(剛建立的)
6. 執行`gulp serve`, 用port:8080可看到hello world, 用port:9001/contacts可得到回傳的json.

server task
```
var server = require('gulp-live-server');

gulp.task('server', function() {
	var live = new server('server.js');
	live.start();
});
```

執行serve時也要同時執行server
```
gulp.task('serve', ['server'],function() {});
```

---
# CH03

### 0301 - Testing servicewith injectand module
1. 建立一個angular service可以用來$http取得ch02建立的後端提供的contacts資料 - `contactService`
2. 安裝`angular-mock`. 'bower install --save angular-mocks'
3. 修改main.spec.js, 利用angular-mocks來載入`contactService`
4. 執行`gulp serve-test`後，會出現`ReferenceError: module is not defined`的錯誤。必需將`angular-mocks.js`在`angular.js`前載入。
5. 執行`gulp serve-test`, 出現`AssertionError: expected { contacts: [] } to be a number`
6. 修改為正確的版本

```
expect(contactService.contacts).to.be.an('array');
```

### 0302_Verifying GET and POST Functionality With httpBackend
1. 為了不用每次都去inject module, 可以用foreach.
2. 因為用了beforeForEach, 可以多寫幾個test, 比如測試httpBackend
3. 測試第一次會得到錯誤, 使用`expectGET()`, 得到第二次錯誤
4. 再加上`respond(200, [])`後，即可得到正確的結果。

foreach code
```
beforeEach(function() {
	module('AddressBook');
	inject(function($injector) {
		contactService = $injector.get('contactService');
	});
});
```

httpBackend 第一次錯誤
```
Error: Unexpected request: GET http://localhost:9001/contacts
```
httpBackend 第二次錯誤
```
Error: No response defined !
```

完整httpBackend code
```
$httpBackend.expectGET("http://localhost:9001/contacts")
.respond(200, []);
$httpBackend.flush();
```