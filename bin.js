import { moment } from "https://deno.land/x/moment/moment.ts"

async function main () {

  var encoder = new TextEncoder("utf-8")
  var decoder = new TextDecoder("utf-8")
  
  var files = await Deno.readDir('./src/')

  //var header = await Deno.readFile('./layouts/header.html') 
  
  var header = decoder.decode(await Deno.readFile('./layouts/header.html'))

  console.log(header)

  await Deno.copyFile("./static/style.css", "./build/style.css");

  //var footer = await Deno.readFile('./layouts/footer.html')

  var footer = decoder.decode(await Deno.readFile('./layouts/footer.html'))

  console.log(footer)
    
  var indexhtml = '<ul>'


  for (var i = 0; i < files.length; i++) {


    //source directory
    var data = await Deno.readFile('./src/' + files[i].name)

    var parsed = JSON.parse(decoder.decode(data))  

    var formadate = moment(parsed.date).format("YYYY-MM-DD")

    var structure =header + '<h1>' + parsed.title + '</h1>' + '<p>' + formadate + '</p>' + '<p>' + parsed.post + '</p>' + footer 
  
    var compiled = encoder.encode(structure)

    //destination directory 
    Deno.writeFileSync('./build/' + files[i].name  + ".html", compiled)
  
    var link = '\n<li><a href="' + files[i].name + '.html">' + parsed.title + '</a></li>'

    indexhtml = indexhtml + link 

    if (i == files.length -1 ){
      indexhtml = header + indexhtml + '</ul>' + footer
      Deno.writeFileSync('./build/index.html', encoder.encode(indexhtml))

    console.log('Your retroblog is built.')
    } 

  }

}  

main()
