// //for updating
// export async function PUT(request,{params}){
//     try {
//         return Response.json({message: `you called the PUT , /api/informatons/[${params.id}] route`})
//     } catch (error) {
//         return Response.json({message: "something went wrong"})

        
//     }
// }
// export async function DELETE(request,{params}){
//     try {
//         return Response.json({message: `you called the DELETE , /api/informatons/[${params.id}] route`})
//     } catch (error) {
//         return Response.json({message: "something went wrong"})

        
//     }
// }
export async function GET(request,{params}){
    const { id } = params;
    // const papers = [
    //     {
    //         "id" : 1,
    //         "paperTitle": "The Impact of Climate Change on Biodiversity",
    //         "abstract": "This paper explores the effects of climate change on the diversity of species and ecosystems around the world.",
    //         "author":{
    //         "firstName": "Sarah",
    //         "lastName": "Jones",
    //         "email": "sarahjones@email.com",
    //         "affiliation": "University of Oxford"
    //         }
    //       }
    // ]
    const papers = await fs.readJSON('./data/information.json')
    fs.writeJSON('./data/information.json',info)
    const info = papers.find(info => info.id===parseInt(id));
    return Response.json(info);
}