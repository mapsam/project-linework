function amp() {
	//Thanks Google Fonts for these web fonts
	var fonts = [
		'"Amatic SC"',
		'"Montserrat"'
	];
	
	var numFonts = fonts.length,
		i = 0,
		total = 0,

	function amplify(){
		setTimeout(function(){
			$('.amp').css({'font-family':fonts[i], 'color':'hsla(215,'+colorPercent+'%,30%, 1)'});
			$('.count').text(total);
			total++;
			i++;
			if(i<numFonts){
				amplify();
			}
			if(i===numFonts){
				i=0;
				amplify();
			}
		}, 500);
	}
	amplify();
}
