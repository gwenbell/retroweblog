import { moment } from "https://deno.land/x/moment/moment.ts"

async function main () {

  var encoder = new TextEncoder("utf-8")
  var decoder = new TextDecoder("utf-8")
  
  var files = await Deno.readDir('./src')

  var header = await Deno.readFile('./layouts/header.html') 
  
  console.log(decoder.decode(header))

  await Deno.copyFile("./static/style.css", "./build/style.css");

  var footer = await Deno.readFile('./layouts/footer.html')

  console.log(decoder.decode(footer))
    
  for (var i = 0; i < files.length; i++) {

    var data = await Deno.readFile('./src/' + files[i].name)

    var parsed = JSON.parse(decoder.decode(data))  

    var formadate = moment(parsed.date).format("YYYY-MM-DD")

    var structure = decoder.decode(header) + '<h1>' + parsed.title + '</h1>' + '<p>' + formadate + '</p>' + '<p>' + parsed.post + '</p>' + '<h6>' + decoder.decode(footer) + '</h6>'
  
    var compiled = encoder.encode(structure)
  
    Deno.writeFileSync('./build/' + files[i].name  + ".html", compiled)
  
  }

}  

main()
