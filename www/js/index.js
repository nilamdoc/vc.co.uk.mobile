/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

var domain = "https://vccouk/";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
			
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },

		index: function(){
				var  myURL = "https://ibwt.co.uk/mobile"
        $.ajax({
            url: 'http://query.yahooapis.com/v1/public/yql?q=select * from json where url="'+
						myURL
						+'"&format=json&callback=',
            type: 'GET',
            dataType: 'json',
            success: function(data){
							$("#Users").html(data['query']['results']['json']['result']['users']);
							$("#Online").html(data['query']['results']['json']['result']['online']);							
							$("#Pending").html(data['query']['results']['json']['result']['online']);														
							var length = data['query']['results']['json']['result']['DetailPendingOrders']['result'].length,
							element = null,
									
							html = '<table class="table table-condensed table-bordered table-hover"><thead><tr><th>Action</th><th>First</th><th>Second</th><th>BTC</th><th>Amount</th><th>Price</th></tr></thead><tbody>';
							for (var i = 0; i < length; i++) {
								element = data['query']['results']['json']['result']['DetailPendingOrders']['result'][i];

								html = html + '<tr>';
								html = html + '<td>'+element['_id']['Action']+'</td>';
								html = html + '<td>'+element['_id']['FirstCurrency']+'</td>';
								html = html + '<td>'+element['_id']['SecondCurrency']+'</td>';
								html = html + '<td>'+element['Amount']+'</td>';
								html = html + '<td>'+element['TotalAmount']+'</td>';
								html = html + '<td>'+(element['TotalAmount']/element['Amount'])+'</td>';
								html = html + '</tr>';
							}
								html = html + '</tbody></table>';
								$("#DetailPendingOrders").html(html);								
								// Do something with element i.
							
            },
            error: function(data){
                console.log(data);
            }
        });

		},
	
    rates: function(){
		},
		contact: function(){
				$.ajax({
				    url: 'https://ibwt.co.uk/Updates/Rates/BTC/USD/',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#portfolio-template").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#portfolio-data').html(portfolioData);
                $('#portfolio-data').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });			
			},
    portfolio: function(){
        $.ajax({
            url: 'https://ibwt.co.uk/?json=get_recent_posts&post_type=portfolio',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#portfolio-template").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#portfolio-data').html(portfolioData);
                $('#portfolio-data').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });
    },
		
		


};