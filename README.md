Augular TDD example
===


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


