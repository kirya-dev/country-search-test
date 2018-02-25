Vue.component('country-item', {
	props: ['info'],
	template:
		  '<li>'
		+   '{{ info.name }}'
		+   '<button v-on:click="app.setSity(info)">more</button>'
		+ '</li>'
});

Vue.component('country-info', {
	props: ['info'],
	template:
		  '<div>'
		+   '<p>Country Name: <b>{{ info.nativeName }}</b></p>'
		+   '<p>Flag: <img v-bind:src="info.flag" width="70" /></p>'
		+   '<p>Capital: <b>{{ info.capital }}</b></p>'
		+   '<p>Code: <b>{{ info.alpha3Code }}</b></p>'
		+   '<p>Languages: <b>{{ info.languages.map((i)=>i.nativeName).join(", ") }}</b></p>'
		+   '<p>Borders Countries: <b>{{ info.borders.join(", ") }}</b></p>'
		// +   '<p><button v-on:click="app.addToFav(info)">Add to fav</button></p>'
		+ '</div>'
});


var app = new Vue({
	el: '#app',
	data: {
		queryText: 'Rus',
		foundedCountries: [],
		curCountry: null
	},
	methods: {
		doQuery: function() {
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://restcountries.eu/rest/v2/name/' + this.queryText);
			xhr.send(null);
			xhr.onload = function() {
				var data = JSON.parse(xhr.response);
				if (typeof data.status !== 'undefined')
					alert(data.message)
				else {
					self.foundedCountries = data;
					self.curCountry = data.length == 1 ? data[0] : null;
				}
			}
		},
		setSity: function(country) {
			this.curCountry = country
		},
		// addToFav: function(info) {
		// 	console.log('Stub', info);
		// }
	}
})