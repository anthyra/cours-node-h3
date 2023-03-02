import { Request, Response } from 'express';
class Homepage {

    getHomepage(req: Request, res: Response) {
        res.json({text: "This is the homepage"});
    }

}

const homepage = new Homepage();

export default homepage;