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
							$("#Pending").html(data['query']['results']['json']['result']['PendingOrders']);
							$("#Completed").html(data['query']['results']['json']['result']['CompletedOrders']);							
							var length = data['query']['results']['json']['result']['DetailPendingOrders']['result'].length,
							element = null,
									
							html = '<table class="table table-condensed table-bordered table-hover"><thead><tr><th>Action</th><th>First</th><th>Second</th><th>Count</th><th>BTC</th><th>Amount</th><th>Price</th></tr></thead><tbody>';
							for (var i = 0; i < length; i++) {
								element = data['query']['results']['json']['result']['DetailPendingOrders']['result'][i];

								html = html + '<tr>';
								html = html + '<td>'+element['_id']['Action']+'</td>';
								html = html + '<td>'+element['_id']['FirstCurrency']+'</td>';
								html = html + '<td>'+element['_id']['SecondCurrency']+'</td>';
								html = html + '<td>'+element['count']+'</td>';								
								html = html + '<td>'+Math.round(element['Amount']*1000000)/1000000+'</td>';
								html = html + '<td>'+Math.round(element['TotalAmount']*1000)/1000+'</td>';
								html = html + '<td>'+Math.round(element['TotalAmount']/element['Amount']*1000)/1000+'</td>';
								html = html + '</tr>';
							}
								html = html + '</tbody></table>';
								$("#DetailPendingOrders").html(html);								
								// Do something with element i.
							var length = data['query']['results']['json']['result']['DetailCompletedOrders']['result'].length,
							element = null,
									
							html = '<table class="table table-condensed table-bordered table-hover"><thead><tr><th>Action</th><th>First</th><th>Second</th><th>BTC</th><th>Count</th><th>Amount</th><th>Price</th></tr></thead><tbody>';
							for (var i = 0; i < length; i++) {
								element = data['query']['results']['json']['result']['DetailCompletedOrders']['result'][i];

								html = html + '<tr>';
								html = html + '<td>'+element['_id']['Action']+'</td>';
								html = html + '<td>'+element['_id']['FirstCurrency']+'</td>';
								html = html + '<td>'+element['_id']['SecondCurrency']+'</td>';
								html = html + '<td>'+element['count']+'</td>';								
								html = html + '<td>'+Math.round(element['Amount']*1000000)/1000000+'</td>';
								html = html + '<td>'+Math.round(element['TotalAmount']*1000)/1000+'</td>';
								html = html + '<td>'+Math.round(element['TotalAmount']/element['Amount']*1000)/1000+'</td>';
								html = html + '</tr>';
							}
								html = html + '</tbody></table>';
								$("#DetailCompletedOrders").html(html);								
								// Do something with element i.

							var length = data['query']['results']['json']['result']['Details'].length,
							element = null,BTC=0,GBP=0,USD=0,EUR=0,
									
							html = '<table class="table table-condensed table-bordered table-hover"><thead><tr><th>#</th><th>Username</th><th>Verify</th><th>Full Name</th><th>TOTP</th><th>BTC</th><th>GBP</th><th>USD</th><th>EUR</th></tr></thead><tbody>';
							for (var i = 0; i < length; i++) {
								element = data['query']['results']['json']['result']['Details'][i];

								html = html + '<tr>';
								html = html + '<td>'+(i+1)+'</td>';								
								html = html + '<td>'+element['username']+'</td>';
								html = html + '<td>';
								if(element['BankVerified']=="null"){
									html = html + '<span class="label">B</span>';
								}
								if(element['BankVerified']=="No"){
									html = html + '<span class="label label-important">B</span>';
								}
								if(element['BankVerified']=="Yes"){								
									html = html + '<span class="label label-success">B</span>';
								}
								if(element['GovtVerified']=="null"){
									html = html + '<span class="label">G</span>';
								}
								if(element['GovtVerified']=="No"){
									html = html + '<span class="label label-important">G</span>';
								}
								if(element['GovtVerified']=="Yes"){								
									html = html + '<span class="label label-success">G</span>';
								}
								if(element['UtilVerified']=="null"){
									html = html + '<span class="label">P</span>';
								}
								if(element['UtilVerified']=="No"){
									html = html + '<span class="label label-important">P</span>';
								}
								if(element['UtilVerified']=="Yes"){								
									html = html + '<span class="label label-success">P</span>';
								}
								html = html + '</td>';
								html = html + '<td>'+element['firstname']+' '+element['lastname']+'</td>';								
								html = html + '<td>';
								if(element['TOTPvalidate']=="null"){
									html = html + '<span class="label">V</span>';
								}
								if(element['TOTPvalidate']=="false"){
									html = html + '<span class="label label-important">V</span>';
								}
								if(element['TOTPvalidate']=="true"){								
									html = html + '<span class="label label-success">V</span>';
								}								
								if(element['TOTPlogin']=="null"){
									html = html + '<span class="label">L</span>';
								}
								if(element['TOTPlogin']=="false"){
									html = html + '<span class="label label-important">L</span>';
								}
								if(element['TOTPlogin']=="true"){								
									html = html + '<span class="label label-success">L</span>';
								}								
								if(element['TOTPsecurity']=="null"){
									html = html + '<span class="label">S</span>';
								}
								if(element['TOTPsecurity']=="false"){
									html = html + '<span class="label label-important">S</span>';
								}
								if(element['TOTPsecurity']=="true"){								
									html = html + '<span class="label label-success">S</span>';
								}								
								if(element['TOTPwithdrawal']=="null"){
									html = html + '<span class="label">W</span>';
								}
								if(element['TOTPwithdrawal']=="false"){
									html = html + '<span class="label label-important">W</span>';
								}
								if(element['TOTPwithdrawal']=="true"){								
									html = html + '<span class="label label-success">W</span>';
								}								
								
								BTC = BTC + Math.round(element['BTC']*10000000)/10000000;
								BTC = BTC + Math.round(element['Sell']['BTC-GBP']['Amount']*10000000)/10000000;
								BTC = BTC + Math.round(element['Sell']['BTC-EUR']['Amount']*10000000)/10000000;
								BTC = BTC + Math.round(element['Sell']['BTC-USD']['Amount']*10000000)/10000000;
								GBP = GBP + Math.round(element['GBP']*1000)/1000;
								GBP = GBP + Math.round(element['Buy']['BTC-GBP']['TotalAmount']*1000)/1000;
								USD = USD + Math.round(element['USD']*1000)/1000;
								USD = USD + Math.round(element['Buy']['BTC-USD']['TotalAmount']*1000)/1000;
								EUR = EUR + Math.round(element['EUR']*1000)/1000;
								EUR = EUR + Math.round(element['Buy']['BTC-EUR']['TotalAmount']*1000)/1000;



								html = html + '</td>';
								html = html + '<td>'+(Math.round(element['BTC']*10000000)/10000000).toFixed(10)+'<br>';
								html = html + (Math.round(element['Sell']['BTC-GBP']['Amount']*10000000)/10000000+Math.round(element['Sell']['BTC-USD']['Amount']*10000000)/10000000+Math.round(element['Sell']['BTC-EUR']['Amount']*10000000)/10000000).toFixed(10);
								html = html +	'</td>';																
								html = html + '<td>'+(Math.round(element['GBP']*1000)/1000).toFixed(4)+'<br>';
								html = html + (Math.round(element['Buy']['BTC-GBP']['TotalAmount']*1000)/1000).toFixed(4)+'</td>';																								
								html = html + '<td>'+(Math.round(element['USD']*1000)/1000).toFixed(4)+'<br>';
								html = html + (Math.round(element['Buy']['BTC-USD']['TotalAmount']*1000)/1000).toFixed(4)+'</td>';																								
								html = html + '<td>'+(Math.round(element['EUR']*1000)/1000).toFixed(4)+'<br>';
								html = html + (Math.round(element['Buy']['BTC-EUR']['TotalAmount']*1000)/1000).toFixed(4)+'</td>';																								
								html = html + '</tr>';
							}
								html = html + '</tbody></table>';
								$("#UsersCount").html(length);								
								$("#UsersDetails").html(html);								

						$("#BTC").html(BTC);
						$("#GBP").html(GBP);
						$("#EUR").html(EUR);
						$("#USD").html(USD);						

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