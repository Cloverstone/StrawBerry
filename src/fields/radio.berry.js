(function(b, $){
	b.register({ type: 'radio',
		create: function() {
			this.options = b.processOpts.call(this.owner, this.item, this).options;
			return b.render('berry_' + (this.elType || this.type), this);
		},
		setup: function() {
			this.$el = this.self.find('[type=radio]');
			this.$el.off();
			if(this.onchange !== undefined) {
				this.on('change', this.onchange);
			}
			this.$el.change($.proxy(function(){this.trigger('change');}, this));
		},
		getValue: function() {
			if(this.item.waiting){
				return this.value;
			}
			var selected = this.self.find('[type="radio"]:checked').data('label');
			for(var i in this.item.options) {
				if(this.item.options[i].label == selected) {
					return this.item.options[i].value;
				}
			}
		},
		setValue: function(value) {
			if(typeof value !== 'object' && this.item.waiting || (typeof _.findWhere(this.options, {value:  value}) !== 'undefined' || typeof _.findWhere(this.options, {value:  value+=''}) !== 'undefined' || typeof _.findWhere(this.options, {value:  parseInt(value, 10)}) !== 'undefined') ){
				if(typeof this.lastSaved === 'undefined'){
					this.lastSaved = value;
				}
			//if(typeof _.findWhere(this.options, {value: value}) !== 'undefined'){
				this.value = value;
				this.self.find('[value="' + this.value + '"]').prop('checked', true);
			}
		},
		displayAs: function() {
			for(var i in this.item.options) {
				if(this.item.options[i].value == this.lastSaved) {
					return this.item.options[i].label;
				}
			}
		},
		focus: function(){
			this.self.find('[type="radio"]:checked').focus();
		}
	});
})(Berry, jQuery);