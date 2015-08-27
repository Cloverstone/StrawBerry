Berry.prototype.events.initialize.push({
	token: Berry.getUID(),
	func: function() {
		Berry.field.prototype.dupeMe = function() {
			var target = this.self;
			var max = this.max || -1;
			var count = $(target).siblings('[name='+this.name+']').length+1;
			if(max == -1 || max > count){
				var item = $.extend({},this.item,{id:Berry.getUID(),name:this.name});
				this.owner.processField($.extend({}, this.owner.options.default, item), $(target), this.parent, 'after');
				this.owner.each(function(){
					this.createAttributes();
				});

				this.trigger('change');
			}
		}
		Berry.field.prototype.dropMe = function() {
			var target = this.self;
			var min = this.min || 1;
			var count = $(target).siblings('[name='+this.name+']').length;
			if(min <= count){
				$(target).empty().remove();
				var index=0;
				this.trigger('dropped');
				var instances = this.owner.find(this.getPath());//.instances;
				for(var j in instances){
					instances[j].instance_id = index++;
				}
				this.trigger('change');
			}
		}
		this.on('initializedField', function(opts){
			if(opts.field.multiple && opts.field.multiple.duplicate) {
				opts.field.self.find('.duplicate').on('click', $.proxy(opts.field.dupeMe, opts.field) );
				opts.field.self.find('.remove').on('click', $.proxy(opts.field.dropMe, opts.field) );
			}
		});
	}
});
