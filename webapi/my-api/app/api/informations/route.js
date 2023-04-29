import InformationRepo from "./information-repo"
const repo = new InformationRepo()
export async function GET(request){
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const information = await repo.getInformations(id);

        if (information) {
            // return information object if found
            return new Response(JSON.stringify(information), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            // return 404 if information object not found
            return new Response("Not found", { status: 404 });
        }
    } else {
        // return all information objects
        const informations = await repo.getInformations();
        return new Response(JSON.stringify(informations), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
export async function POST(request){
    const { paperTitle, abstract, authors } = await request.json()

    try {
        // auto-generate id
        const informations = await repo.getInformations()
        const id = (informations.length > 0) ? (parseInt(informations[informations.length - 1].id) + 1).toString() : "1"

        const newInformation = {
          id: id,
          paperTitle: paperTitle,
          abstract: abstract,
          authors: authors.map(author => {
            return {
              firstName: author.firstName,
              lastName: author.lastName,
              email: author.email,
              affiliation: author.affiliation
            }
          })
        }

        await repo.addInformation(newInformation)

        return new Response("Information added successfully.")
    } catch (error) {
        console.error(error)
        return new Response("Error adding information", { status: 500 })
    }
}




