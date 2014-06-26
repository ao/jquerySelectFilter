(function($) {
	$.fn.jquerySelectFilter = function( options ) {

		var original_input = $(this);

		var settings = $.extend({
			id: Math.random().toString().split(".").join(""),
			name: "jquerySelectFilterValue",
			style: "",
			defaultvalue: "Select..",
			optionslist: ["<a href='javascript:;' data-id='test1'>test1</a>",
				"<a href='javascript:;' data-id='test2'>test2</a>",
				"<a href='javascript:;' data-id='test3'>test3</a>"],
			callbackadd: function(data) {}
		}, options);


		var html = "<div class='jquerySelectFilterContainer' id='jquerySelectFilterContainer_"+settings.id+"'> \
						<div class='jquerySelectFilterContainer_simple' style='"+settings.style+"' id='jquerySelectFilterContainer_simple_"+settings.id+"'><span class='simple_value'>"+settings.defaultvalue+"</span><span class='arrow'>&#x25BC;</span></div> \
						<div class='jquerySelectFilterContainer_advanced' style='"+settings.style+"' id='jquerySelectFilterContainer_advanced_"+settings.id+"'> \
							<div class='jquerySelectFilterContainer__search'id='jquerySelectFilterContainer__search_"+settings.id+"'> \
								<input type='text' placeholder='Search..' /> \
							</div> \
							<div class='jquerySelectFilterContainer__select'id='jquerySelectFilterContainer__select_"+settings.id+"'>";

		for (var i=0; i<settings.optionslist.length; i++) {
			html += settings.optionslist[i];
		}

		html += "			</div> \
							<div class='jquerySelectFilterContainer__add'id='jquerySelectFilterContainer__add_"+settings.id+"'> \
								<input id='txt' type='text' placeholder='Add new..' /> \
							</div> \
							<input type='hidden' class='jquerySelectFilterHiddenValue'id='jquerySelectFilterHiddenValue_"+settings.id+"' name='"+settings.name+"' value='DEFAULT VALUE' /> \
						</div> \
					</div> \
				</div>";

		original_input.parent().append(html);

		$("#jquerySelectFilterContainer__search_"+settings.id+" input").keyup(function() {
			var value = $("#jquerySelectFilterContainer__search_"+settings.id+" input").val();
			$("#jquerySelectFilterContainer__select_"+settings.id+" > a").each(function() {
				if ($(this).text().search(value) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});
		function jquerySelectFilterUpdateValue(id, value) {
			$("#jquerySelectFilterContainer_simple_"+settings.id+" span.simple_value").html( value );
			original_input.val( id );
			$("#jquerySelectFilterContainer_"+settings.id).trigger("mouseout");
		}
		$("#jquerySelectFilterContainer__select_"+settings.id+" a").on("click", function() {
			jquerySelectFilterUpdateValue($(this).attr("data-id"), $(this).html());
		});
		$("#jquerySelectFilterContainer__add_"+settings.id+" input").keypress(function(e) {
			var value = $("#jquerySelectFilterContainer__add_"+settings.id+" input").val();
			if(e.which == 13) {

				settings.callbackadd(value);

				$("#jquerySelectFilterContainer__select_"+settings.id).append('<a href="javascript:;" data-id="'+value+'">'+value+'</a>');
				jquerySelectFilterUpdateValue(value, value);
				$("#jquerySelectFilterContainer__select_"+settings.id+" a").off().on("click", function() {
					jquerySelectFilterUpdateValue($(this).attr("data-id"), $(this).html());
				});
			}
		});

		$("#jquerySelectFilterContainer_"+settings.id).on("mouseover", function() {
			$("#jquerySelectFilterContainer_simple_"+settings.id).hide();
			$("#jquerySelectFilterContainer_advanced_"+settings.id).show();
			$("#jquerySelectFilterContainer__search_"+settings.id+" input").focus();
		});
		$("#jquerySelectFilterContainer_"+settings.id).on("mouseout", function() {
			$("#jquerySelectFilterContainer_advanced_"+settings.id).hide();
			$("#jquerySelectFilterContainer_simple_"+settings.id).show();
		});

		setInterval(function() {
			if ($("#jquerySelectFilterContainer_simple_"+settings.id).is("visible")) {
				$("#jquerySelectFilterContainer__add_"+settings.id+" input").val("");

				$("#jquerySelectFilterContainer__search_"+settings.id+" input").val("");
				$("#jquerySelectFilterContainer__select_"+settings.id+" > a").each(function() {
					$(this).show();
				});
			}
		}, 1000);

	};
})(jQuery)