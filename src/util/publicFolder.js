import express from 'express';



export default function(app, path, __dirname) {
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use('/admin/profile', express.static(path.join(__dirname, 'public')));

app.use('/admin/lecturer', express.static(path.join(__dirname, 'public')));
app.use('/admin/lecturer/profile', express.static(path.join(__dirname, 'public')));
app.use('/admin/lecturer/edit', express.static(path.join(__dirname, 'public')));

app.use('/admin/student', express.static(path.join(__dirname, 'public')));
app.use('/admin/student/profile', express.static(path.join(__dirname, 'public')));
app.use('/admin/student/edit', express.static(path.join(__dirname, 'public')));

app.use('/admin/course/about', express.static(path.join(__dirname, 'public')));
app.use('/admin/course/edit', express.static(path.join(__dirname, 'public')));
app.use('/admin/course', express.static(path.join(__dirname, 'public')));

app.use('/admin/category', express.static(path.join(__dirname, 'public')));
app.use('/admin/category/:id', express.static(path.join(__dirname, 'public')));

app.use('/admin/chapter/overview', express.static(path.join(__dirname, 'public')));
app.use('/admin/chapter/basic', express.static(path.join(__dirname, 'public')));
app.use('/admin/chapter/master', express.static(path.join(__dirname, 'public')));
app.use('/admin/chapter/advanced', express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname, 'public/assets/css')));
app.use('/images', express.static(path.join(__dirname, 'public/assets/images'))); 
app.use('/vendor', express.static(path.join(__dirname, 'public/vendors/vendor-video'))); 
app.use('/js', express.static(path.join(__dirname, 'assets/js'))); 
}