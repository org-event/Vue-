export default {
	props: {
	  show: {
	    type: Boolean,
	    default: false
	  }
	},

	methods:{
	  hideMyModal(){
	    this.$emit('update:show', false)
	  }
	},

	mounted(){

	}

}