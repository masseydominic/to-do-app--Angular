(function (){
	'use strict';
	angular.module("toDoApp", [])
	.controller("toDoController", toDoController)
	.service("toDoService", toDoService);

	toDoController.$inject=['toDoService'];
	function toDoController(toDoService){
		var tdc= this;
		tdc.data1= "To Do list, myboy!";
		tdc.titleData= "Disha's To Do list!";
		tdc.item= '';
		tdc.msg="You have already added this item!"
		tdc.x=0;
		tdc.blank="";
		tdc.list = toDoService.getitem();
		console.log(tdc.list);
		tdc.add = function(data){
			if(data==""){
					return (tdc.blank="Poof! Enter a task Please!");
				}
			else{

				tdc.blank="";
				tdc.x=0;
				if(tdc.list.length ==0){
					toDoService.additem(data);
					tdc.blank="";
					tdc.item = '';
					// console.log(tdc.list.length);
					// tdc.list=toDoService.getitem();
					// localStorage.setItem('list', JSON.stringify(tdc.list));


				}
				else{
					for (var i = 0; i <=tdc.list.length-1; i++) {
						var temp= tdc.list[i];
						console.log(tdc.list.length);
						// if (temp.toLowerCase().indexOf(data)!==-1) {
						if (temp.localeCompare(data)==0) {
							console.log("ABCD");
							tdc.item = '';
							tdc.x=1;
							return;
						}
						else{
							tdc.x=0;
							tdc.item = '';
					
						}	
					}
					if(tdc.x==0){
						toDoService.additem(data);
					}

				}	
			}
		}

		tdc.move= function(data1, index){
			toDoService.moveitem(data1);
			toDoService.removeItem(index);

		}

		tdc.getComplete = function(){
			return toDoService.getCompleteItem();

		}

		tdc.destroyAll = function(){
			toDoService.destAll();
			// localStorage.removeItem('list');
		}

		tdc.nOfItem = function(){
			if(toDoService.getitem()=== null){
				return("Lets do it");
			}
			else{
				if( toDoService.getitem().length > 0){
				return((toDoService.getitem().length) + " task(s) incomplete");
			}
			else{
				return("Nothing Scheduled sweety! Enjoy ;)");
			}

			}
		}

	}	

	function toDoService(){
		var tds=this;
		var saved = localStorage.getItem('list');
		var list1= JSON.parse(saved) || [];
		var saved2 = localStorage.getItem('list2');
		var complete_list= JSON.parse(saved2) || [];
		tds.additem = function(data){
				list1.push(data);

				localStorage.setItem('list', JSON.stringify(list1));
				// tds.getitem();
			}

		tds.getitem = function(){
			// console.log(list1);
			return list1;
		}

		tds.moveitem= function(data1){
			complete_list.push(data1);
			localStorage.setItem('list2', JSON.stringify(complete_list));
			// tds.getCompleteItem();
		}
		tds.getCompleteItem= function(){
			return complete_list;
			console.log(complete_list);
		}
		tds.removeItem = function(index){
			list1.splice(index,1);
			localStorage.setItem('list', JSON.stringify(list1));
			console.log(list1);
		}
		tds.destAll = function(){
			complete_list.splice(0,complete_list.length);
			localStorage.setItem('list2', JSON.stringify(complete_list));
			
		}

	}

})();