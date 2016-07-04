window.ga = window.ga || function() { (ga.q = ga.q||[]).push(arguments)};
ga.l = +new Date;
new Fingerprint2().get(function (result) {
	ga('create', {
		trackingId: 'UA-80274750-1',
		cookieDomain: 'auto',
		userId: result
	});
	ga('send', 'pageview');
});