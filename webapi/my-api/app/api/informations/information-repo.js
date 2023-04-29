import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

export default class InformationRepo {
    constructor() {
        this.path = path.join(process.cwd(), 'app/data/information.json')
        console.log(this.path);
    }

    async getInformations(id) {
        const informations = await fs.readJSON(this.path)
        if (id) {
            return informations.find(info => info.id === id)
        }
        return informations;
    }

    async addInformation(info) {
        const informations = await fs.readJSON(this.path);
        const lastInfo = informations[informations.length - 1];
        const id = (lastInfo ? parseInt(lastInfo.id) + 1 : 1).toString();

        const authors = info.authors.map(author => ({
          //id: nanoid(),
          firstName: author.firstName,
          lastName: author.lastName,
          email: author.email,
          affiliation: author.affiliation
        }));

        const newInfo = {
          id: id,
          paperTitle: info.paperTitle,
          abstract: info.abstract,
          authors: authors
        };
        informations.push(newInfo);
        await fs.writeJSON(this.path, informations, { flag: 'w' });
        return newInfo;
      }
    
    async handleRequest(request) {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (request.method === 'GET') {
            return this.getInformations(id)
        } else if (request.method === 'POST') {
            const info = await request.json()
            return this.addInformation(info)
        }
    }
    
}
