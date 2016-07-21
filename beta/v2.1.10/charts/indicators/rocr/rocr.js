define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,e){require(["css!charts/indicators/rocr/rocr.css"]);var f=[];require(["text!charts/indicators/rocr/rocr.html","text!charts/indicators/indicators.json"],function(g,h){var i="#cd0a0a";g=a(g),g.appendTo("body"),h=JSON.parse(h);var j=h.rocr;g.attr("title",j.long_display_name),g.find(".rocr-description").html(j.description),g.find("input[type='button']").button(),g.find("#rocr_stroke").colorpicker({position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#rocr_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted},ok:function(b,c){a("#rocr_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted}});var k="Solid";a("#rocr_dashStyle").ddslick({imagePosition:"left",width:148,background:"white",onSelected:function(b){a("#rocr_dashStyle .dd-selected-image").css("max-width","115px"),k=b.selectedData.value}}),a("#rocr_dashStyle .dd-option-image").css("max-width","115px");var l=g.find("#rocr_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(f,function(b,c){a(l.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),g.find("#rocr_level_delete").click(function(){l.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):l.rows(".selected").remove().draw()}),g.find("#rocr_level_add").click(function(){require(["indicator_levels"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(l.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),g.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"rocr-ui-dialog",buttons:[{text:"OK",click:function(){var c=a(".rocr_input_width_for_period");if(!_.isInteger(_.toNumber(c.val()))||!_.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})}),void c.val(c.prop("defaultValue"));var e=[];a.each(l.rows().nodes(),function(){var b=a(this).data("level");b&&e.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var f={period:parseInt(g.find(".rocr_input_width_for_period").val()),stroke:i,strokeWidth:parseInt(g.find("#rocr_strokeWidth").val()),dashStyle:k,appliedTo:parseInt(g.find("#rocr_appliedTo").val()),levels:e};d&&d(),a(a(".rocr").data("refererChartID")).highcharts().series[0].addIndicator("rocr",f),b.call(g)}},{text:"Cancel",click:function(){b.call(this)}}]}),g.find("select").each(function(b,c){a(c).selectmenu({width:150}).selectmenu("menuWidget").css("max-height","85px")}),"function"==typeof e&&e(c)})}var d=null;return{open:function(b,e){var f=function(){d=e,a(".rocr").data("refererChartID",b).dialog("open")};0==a(".rocr").length?c(b,this.open):f()}}});