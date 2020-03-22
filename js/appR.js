new Vue({
	el: '#controlador_videos',
	data: {
		videos: [],
		url: ''
	},
	mounted(){
		this.recuperarVideos();
	},
	methods: {
		recuperarVideos: function(){
			this.cargando_videos = true;
			this.$http.get('../video/recuperar_videos').then(function(respuesta){
				this.videos = respuesta.body;
				this.cargando_videos = false;
			}, function(){
				alert('No se han podido recuperar los estados.');
				this.cargando_videos = false;
			});
		},
		link: function (string) {
			var array = string.split('=');
			return array[1];
		},
		pusherV: function () {
			// Enable pusher logging - don't include this in production
			Pusher.logToConsole = true;

			var pusher = new Pusher('69983059216d658ecc3b', {
				cluster: 'us2',
				forceTLS: true
			});

			pusher.subscribe('video');
			pusher.bind('my-event', function(data) {
				this.videos = data;

				// alert(JSON.stringify(data));
				// this.DataPusher(data);
			});
		},
		DataPusher: function(data){
				this.videos = data;
		},
		// reproductor: function () {
		// 	window.onload = function playlist() {
		// 		var reproductor = document.getElementById("reproductor"),
		// 			videos = [
		// 				'canciones/pista1.mp4'
		// 			],
		// 			// videos = 'http://vuecode.local/canciones/pista1.mp4';
		// 			info = document.getElementById("info");
		//
		// 		info.innerHTML = "Video: " + videos;
		// 		reproductor.src = videos;
		// 		reproductor.play();
		//
		// 		reproductor.addEventListener("ended", function () {
		// 			var nombreActual = info.innerHTML.split(": ")[1];
		// 			var actual = videos.indexOf(nombreActual);
		// 			actual = actual == videos.length - 1 ? 0 : actual + 1;
		// 			this.src = videos[actual];
		// 			info.innerHTML = "Video: " + videos[actual];
		// 			this.play();
		// 		}, false);
		// 	}
		// }
	},
	created: function(){
		this.pusherV();
	}
});
