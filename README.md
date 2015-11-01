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



