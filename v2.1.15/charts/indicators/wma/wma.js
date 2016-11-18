define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,e){require(["css!charts/indicators/wma/wma.css"]),require(["text!charts/indicators/wma/wma.html","text!charts/indicators/indicators.json"],function(f,g){var h="#cd0a0a";f=a(f),f.appendTo("body"),g=JSON.parse(g);var i=g.wma;f.attr("title",i.long_display_name),f.find(".wma-description").html(i.description),f.find("input[type='button']").button(),f.find("#wma_stroke").colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#wma_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted},ok:function(b,c){a("#wma_stroke").css({background:"#"+c.formatted}).val(""),h="#"+c.formatted}});var j="Solid";a("#wma_dashStyle").ddslick({imagePosition:"left",width:150,background:"white",onSelected:function(b){a("#wma_dashStyle .dd-selected-image").css("max-height","5px").css("max-width","115px"),j=b.selectedData.value}}),a("#wma_dashStyle .dd-option-image").css("max-height","5px").css("max-width","115px"),f.dialog({autoOpen:!1,resizable:!1,modal:!0,width:350,height:400,my:"center",at:"center",of:window,dialogClass:"wma-ui-dialog",buttons:[{text:"OK",click:function(){var c=a(".wma_input_width_for_period");if(!_.isInteger(_.toNumber(c.val()))||!_.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})}),void c.val(c.prop("defaultValue"));var e={period:parseInt(f.find(".wma_input_width_for_period").val()),stroke:h,strokeWidth:parseInt(f.find("#wma_strokeWidth").val()),dashStyle:j,appliedTo:parseInt(f.find("#wma_appliedTo").val())};d&&d(),a(a(".wma").data("refererChartID")).highcharts().series[0].addIndicator("wma",e),b.call(f)}},{text:"Cancel",click:function(){b.call(this)}}]}),f.find("select").each(function(b,c){a(c).selectmenu({width:150}).selectmenu("menuWidget").css("max-height","85px")}),"function"==typeof e&&e(c)})}var d=null;return{open:function(b,e){d=e||d;var f=function(){a(".wma").data("refererChartID",b).dialog("open")};0==a(".wma").length?c(b,this.open):f()}}});