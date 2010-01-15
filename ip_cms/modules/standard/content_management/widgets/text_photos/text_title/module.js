/**
 * @package ImpressPages
 * @copyright Copyright (C) 2009 JSC Apro media.
 * @license GNU/GPL, see ip_license.html
 */

function content_mod_text_title() {
	this.title = '';
	this.text = '';
	this.level = '';
	this.my_name = '';
	this.menu_management = '';

	this.preview = preview;
	this.manage = manage;
	this.save = save;
	this.init = init;
	this.store_to_db_fields = store_to_db_fields;
	this.get_answer = get_answer;
	this.set_title = set_title;
	this.set_level = set_level;
	this.set_text = set_text;
	this.close = close;
	this.manage_init = manage_init;
	this.empty = empty;
	this.auto_size = auto_size;

	var collection_number;
	var id;
	var visible;
	var deleted;
	var layout;
	var tmpLevel;

	function init(collection_number, id, visible, my_name, menu_management) {
		this.my_name = my_name;
		this.collection_number = collection_number;
		this.id = id;
		this.visible = visible;
		this.deleted = 0;
		this.menu_management = menu_management;
		this.level = 1;
		this.tmpLevel = 1;
	}

	function empty() {
		if (this.title == ''
				&& (this.text.length < 4 || this.text == '<p><br mce_bogus="1"></p>'))
			return true;
		else
			return false;

	}

	function preview(worker_form, return_script, collection_number) {

		document.getElementById(worker_form).innerHTML = ''
				+ '<input name="action" value="make_preview" />'
				+ '<input name="collection_number" value="' + collection_number
				+ '" />' + '<input name="module_key" value="text_title" />'
				+ '<input name="layout" value="' + this.layout + '" />'
				+ '<input name="group_key" value="text_photos" />'
				+ '<textarea name="title" />' + this.title + '</textarea>'
				+ '<textarea name="text" />' + this.text + '</textarea>'
				+ '<input name="level" value="' + this.level + '"/>'
				+ '<input name="answer_function" value="' + return_script
				+ '" />';

		document.getElementById(worker_form).text.value = this.text;

		document.getElementById(worker_form).submit();

	}
	;

	function manage() {
		var div = document.createElement('div');
		div.setAttribute("className", 'ipCmsManagement');
		div.setAttribute("class", 'ipCmsManagement');
		div.innerHTML = ''
				+ '<label class="ipCmsModuleName">'
				+ widget_text_title_title
				+ '</label> '
				+ '<form id="mod_' + this.collection_number	+ '_layout" action="">'	+ mod_text_title_layout + '</form>'
				+ '<div class="ipCmsModuleSeparator"></div>'
				+ '<input type="hidden" id="management_'
				+ this.collection_number
				+ '_level" value="'
				+ this.level
				+ '">'
				+ '<div>'
				+ '<img class="ipCmsIcon" onclick="'
				+ this.my_name
				+ '.tmpLevel=1; menu_mod_text_title_select_level('
				+ this.collection_number
				+ ', 1 )" id="management'
				+ this.collection_number
				+ '_text_title_level_1" src="'
				+ global_config_modules_url
				+ 'standard/content_management/widgets/text_photos/text_title/design/mod_title_h1.gif"/>'
				+ '<img class="ipCmsIcon" onclick="'
				+ this.my_name
				+ '.tmpLevel=2; menu_mod_text_title_select_level('
				+ this.collection_number
				+ ', 2 )" id="management'
				+ this.collection_number
				+ '_text_title_level_2" src="'
				+ global_config_modules_url
				+ 'standard/content_management/widgets/text_photos/text_title/design/mod_title_h2.gif"/>'
				+ '<img class="ipCmsIcon" onclick="'
				+ this.my_name
				+ '.tmpLevel=3; menu_mod_text_title_select_level('
				+ this.collection_number
				+ ', 3 )" id="management'
				+ this.collection_number
				+ '_text_title_level_3" src="'
				+ global_config_modules_url
				+ 'standard/content_management/widgets/text_photos/text_title/design/mod_title_h3.gif"/>'
				+ '</div>'
				+ '<div class="ipCmsInput"><input id="management_'
				+ this.collection_number + '_text_title" value="'
				+ this.title.replace(/"/g, "&quot;") + '"></div>'
				+ '<label class="ipCmsModuleName">' + widget_text_title_text
				+ '</label>' + '<textarea style="width: 100%;" id="management_'
				+ this.collection_number + '_text"></textarea>'
				+ '<div class="ipCmsClear"></div>';

		div.getElementsByTagName('textarea')[0].value = this.text;

		return div;
	}
	;

	function manage_init() {

		var LayoutSelect = document.getElementById('mod_' + this.collection_number + '_layout').layout;
		for (index = 0; index < LayoutSelect.length; index++) {
			if (LayoutSelect[index].value == this.layout)
				LayoutSelect.selectedIndex = index;
		}
		
		menu_mod_text_title_select_level(this.collection_number, this.level);
		tinyMCE
				.init( {
					theme : "advanced",
					mode : "exact",
					elements : "management_" + this.collection_number + "_text",
					plugins : "paste,inlinepopups,iplink",
					theme_advanced_buttons1 : "pastetext,separator,justifyleft,justifycenter,justifyright,separator,undo,redo,separator",
					theme_advanced_buttons2 : "bold,italic,underline,styleselect",
					theme_advanced_buttons3 : "bullist,numlist,outdent,indent,link,unlink,sub,sup",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "bottom",
					theme_advanced_resizing : true,
					theme_advanced_resize_horizontal : false,
					/* theme_advanced_resize_vertical : true, */
					/* theme_advanced_path_location : "none", */
					extended_valid_elements : "a[name|href|target|title|onclick],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]",
					height : this.auto_size(this.text),
					content_css : global_config_base_url
							+ global_config_template_url
							+ global_config_template + "/default_content.css",
					theme_advanced_styles : global_config_tiny_mce_styles,
					forced_root_block : "p",

					document_base_url : global_config_base_url,
					remove_script_host : false,
					relative_urls : false,
					convert_urls : false,

					paste_auto_cleanup_on_paste : true,
					paste_retain_style_properties : false,
					paste_strip_class_attributes : true,
					paste_remove_spans : true,
					paste_remove_styles : true,
					paste_convert_middot_lists : true,

					paste_preprocess : function(pl, o) {
						o.content = o.content.stripScripts();
						var tmpContent = o.content;

						tmpContent = tmpContent.replace(new RegExp(
								'<!(?:--[\\s\\S]*?--\s*)?>', 'g'), '') // remove
																		// comments
						tmpContent = tmpContent.replace(/(<([^>]+)>)/ig,
								"</p><p>");
						tmpContent = tmpContent.replace(/\n/ig, " "); // remove
																		// newlines
						tmpContent = tmpContent.replace(/\r/ig, " "); // remove
																		// newlines
						tmpContent = tmpContent.replace(/[\t]+/ig, " "); // remove
																			// tabs
						tmpContent = tmpContent.replace(/[ ]+/ig, " "); // remove
																		// multiple
																		// spaces

						tmpContent = tmpContent.replace(
								/(<\/p><p>([ ]*(<\/p><p>)*[ ]*)*<\/p><p>)/ig,
								"</p><p>"); // remove multiple paragraphs

						o.content = tmpContent;
						// Content string containing the HTML from the clipboard
						// alert(o.content);
					},
					paste_postprocess : function(pl, o) {
						// Content DOM node containing the DOM structure of the
						// clipboard
					// alert(o.node.innerHTML);
				}

				});

		tinyMCE.execCommand('mceAddControl', true,
				'management_' + this.collection_number + '_text');

	}

	function auto_size(text) {
		var size;
		size = text.length / 4;
		if (size < 250)
			return 250;
		else {
			if (size > 500)
				return 500;
		}
		return size;
	}

	function save() {
		this.layout = document.getElementById('mod_' + this.collection_number + '_layout').layout.value;
		
		if (document
				.getElementById('management_' + this.collection_number + '_text_title'))
			this.title = document
					.getElementById('management_' + this.collection_number + '_text_title').value;

		this.text = tinyMCE.get(
				'management_' + this.collection_number + '_text').getContent( {
			format : 'raw'
		});// or or tinyMCE.activeEditor.getContent()

		this.level = this.tmpLevel;
		
		this.menu_management
				.module_preview_save_response(this.collection_number);
	}

	function get_answer(notes) {
		/*
		 * for(var i=0; i<notes.length; i++) alert(notes[i]);
		 */
		return false;
	}

	function close() {

	}

	function store_to_db_fields(row_number, menu_element_id) {
		if (this.id == null) {
			if (this.deleted == 0) {
				var fields = [];
				fields.push( [ 'action', 'new_module' ]);
				fields.push( [ 'group_key', 'text_photos' ]);
				fields.push( [ 'module_key', 'text_title' ]);
				fields.push( [ 'layout', this.layout ]);
				fields.push( [ 'title', this.title ]);
				fields.push( [ 'text', this.text ]);
				fields.push( [ 'level', this.level ]);
				fields.push( [ 'content_element_id', menu_element_id ]);
				fields.push( [ 'row_number', row_number ]);
				fields.push( [ 'visible', this.visible ]);
				return fields;
			} else {
			}
		} else {
			if (this.deleted == 0) {
				var fields = [];
				fields.push( [ 'action', 'update_module' ]);
				fields.push( [ 'group_key', 'text_photos' ]);
				fields.push( [ 'module_key', 'text_title' ]);
				fields.push( [ 'layout', this.layout ]);
				fields.push( [ 'title', this.title ]);
				fields.push( [ 'level', this.level ]);
				fields.push( [ 'text', this.text ]);
				fields.push( [ 'id', this.id ]);
				fields.push( [ 'row_number', row_number ]);
				fields.push( [ 'visible', this.visible ]);
				return fields;
			} else {
				var fields = [];
				fields.push( [ 'action', 'delete_module' ]);
				fields.push( [ 'group_key', 'text_photos' ]);
				fields.push( [ 'module_key', 'text_title' ]);
				fields.push( [ 'layout', this.layout ]);
				fields.push( [ 'id', this.id ]);
				return fields;
			}
		}
		document.getElementById(worker_form).submit();
	}

	function set_title(title) {
		this.title = title;
	}

	function set_level(level) {
		if (level == '')
			level = 1;
		this.level = level;

	}

	function set_text(text) {
		this.text = text;
	}

}
