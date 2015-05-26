Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate: '404'
});

Router.map(function(){
	this.route('home', {path:'/', template: 'home'})
	this.route('home2', {path:'/home', template: 'home'})
	this.route('list', {path:'/list', template: 'list'})
	this.route('about', {path:'/about', template: 'about'})
	this.route('login', {path:'/login', template: 'login'})
	this.route('logout', {path:'/logout', template: 'logout'})
});

