(function($) {
   $.fn.runaway = function(typeno,step){
        //selcted item will teleports(looks like so) to the other place. step shows how many items further it moves to.
        //typeno 0 moves back, typeno 1 moves forward and typeno 2 moves randomly back or front.
        if (typeno=="forward"){
            $(this).clone(true).attr("id","pluginlink").insertBefore($(this).prevAll().eq(step-1))
            $(this).remove()
        }else if(typeno == 1){
            $(this).clone(true).attr("id","pluginlink").insertBefore($(this).nextAll().eq(step-1))
            $(this).remove()
        }else if(typeno == "random"){
            var selector = Math.round(Math.random())
            if (selector==1){
                $(this).clone(true).attr("id","pluginlink").insertBefore($(this).nextAll().eq(step-1))
                $(this).remove()
            }
            else if(selector==0){
                $(this).clone(true).attr("id","pluginlink").insertBefore($(this).prevAll().eq(step-1))
                $(this).remove()
            }
        }
   }
   
   //option passer example
   $.fn.highlight = function(options){
       //options can contain color and foreground for highlighting the text.
       
       var settings = {'color': 'yellow','foreground': 'black'}
       if (options) { $.extend(settings, options); }
       
       this.css('background-color', settings['color'])
       this.css('color', settings['foreground'])
   } 
   //callback example
   $.fn.countdown = function(options, callback){
       //options can contain starting timer. and has a calback function as well.
       var this_selected = this;
       
       var settings = { 'from': 60};
       if (options) { $.extend(settings, options); }
       
       startcount = settings['from']
       
       function lets_countdown() {
           if (startcount == 0){
                this_selected.text(startcount);
               clearInterval(interval)
               //call callback
               callback.call(this)
           }
           this_selected.text(startcount);
           startcount -= 1
       }
       
       interval = setInterval(lets_countdown, 1000)
   }
   $.fn.countdownDHMS = function(options,callback){
       var settings = { 'date': null};
       if (options) { $.extend(settings, options); }
       
       var this_selected = this;
       function lets_countdownDHMS(){
           eventDateDHMS = Date.parse(settings['date']) / 1000;
           datenow = Math.floor($.now() / 1000);
           
           seconds = eventDateDHMS - datenow;
           
           days= Math.floor(seconds / (60 * 60 * 24));
           seconds -= days * 60 * 60 * 24;
           
           hours= Math.floor(seconds / (60 * 60));
           seconds -= hours * 60 * 60;
           
           minutes=Math.floor(seconds / 60);
           seconds -= minutes * 60;
           
           //after : is else, ? is if then assigning value at the end.
           hours = (String(hours).length != 2) ? '0' + hours: hours;
           minutes = (String(minutes).length != 2) ? '0' + minutes: minutes;
           seconds = (String(seconds).length != 2) ? '0' + seconds: seconds;
           
           if (!isNaN(eventDateDHMS)){
               this_selected.find('.days').text(days);
               this_selected.find('.hours').text(hours);
               this_selected.find('.mins').text(minutes);
               this_selected.find('.secs').text(seconds);
           }
           
           if(eventDateDHMS<datenow){
               callback.call()
               clearInterval(interval2)
               this_selected.find('.days').text("0");
               this_selected.find('.hours').text("00");
               this_selected.find('.mins').text("00");
               this_selected.find('.secs').text("00");
           }
       }
       interval2 = setInterval(lets_countdownDHMS, 1000);
   }
}) (jQuery);