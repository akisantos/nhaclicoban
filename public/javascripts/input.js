console.log('Loaded')

const editor = new EditorJS({
    onReady: () => {
      console.log('Editor.js is ready to work!')
    },
    placeholder: 'Let`s write an awesome story!',

    tools: {
        header:{
            class: Header,
            shortcut: 'CTRL+SHIFT+H',
            config: {
                placeholder: 'Enter a header',
                levels: [1,2, 3, 4,5,6],
                defaultLevel: 4
            },
        },
        image: SimpleImage,
        list: List, 
        embed: Embed,
    },
    openToolbar() {
        this.api.toolbar.open(); 
    }
    
});

$('#submit').click(()=>{
    console.log(window.location)
    let LocationLink = window.location.href;
    editor.save().then((outputData) => {
        console.log('Article data: ', outputData)
        let holder = JSON.stringify(outputData);

        $.post(LocationLink+'/upload',{"data":holder}, function(result){
            $("#noti").html(result);
          });

        }).catch((error) => {
        console.log('Saving failed: ', error)
        });
})


$('#load').click(()=>{
    const edjsParser = edjsHTML();
    $.getJSON("/javascripts/data/data.json", function(result){
        let html = edjsParser.parse(result);
        $("#res").html(html);

        
      });

      

})