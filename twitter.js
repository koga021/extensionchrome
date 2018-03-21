
(function(window,document){

	window.onload = function(){

		var search 			= document.getElementById('search');
		var searchButton 		= document.getElementById('buttonSearch');
		var progressbar 		= document.getElementById("progressbar");
		var response 			= document.getElementById('response');
		var result 			= document.getElementById('result');

		// executaa ação caso seja clicado no boção buscar
		searchButton.onclick = function()
		{
			if(search.value!="" && search.value!=null)
			{
				if(progressbar.style.display=="none" || progressbar.style.display=='') progressbar.style.display = "block";
				var url = "http://search.twitter.com/search.json?rpp=5&q="+search.value;
				ajaxGetRequest(url,createList);
			}
		}

		// cria a lista com o resultado da busca
		function createList(json)
		{
			response.innerHTML=null;

			var ul 	= document.createElement('ul');
			ul.id	= "list";

			for(var i=0;i<json.results.length;i++)
			{
				var li = document.createElement('li');
				li.innerHTML = '<p><img src="'+json.results[i].profile_image_url+
								'" valign="top" id="avatar"/><b>@'+json.results[i].from_user+
								'</b> : '+json.results[i].text+'</p>';
				ul.appendChild(li);
			} 

                        response.appendChild(ul);

			if(progressbar.style.display=="block")
				progressbar.style.display = "none";

			if(result.style.display=="none" || result.style.display=='')
				result.style.display = "block";
		}

		// função para a execução do ajax
		function ajaxGetRequest(url,callback)
		{
			var req = new XMLHttpRequest();
			req.open("GET",url,true);
			req.onreadystatechange  = function(data)
			{
				if(req.readyState == 4 && req.status == 200)
					callback(JSON.parse(req.responseText)) 
				else 
					callback(null)
			}
			req.send(null);
		}
	}
})(window,document);;i++)>