import Proposal from '../model/proposal.js'
import mongoose from 'mongoose';




/* Creating the Proposal */
export const createproposal = async(req, res, next) => {
    const { title, abstract, problem_statement, objective, tags, creator, createdAt } = req.body;
   

    const newProposal = new Proposal({ title, abstract, problem_statement, objective, tags, creator, createdAt: new Date().toISOString() })
    try {

        await newProposal.save();

        res.status(201).json(newProposal);
    } catch (error) {
        next(error)
    }

}

/* getting the post */
export const getallproposal = async(req, res, next) => {
    try {
        const proposal = await Proposal.find();
        res.status(200).json(proposal);
    } catch (error) {
        next(error)
    }
}

export const getproposalbyid = async(req, res, next) => {
    const  id  = req.params;

    try {
        const proposalbyid = await Proposal.findById(id);

        res.status(200).json(proposalbyid);
    } catch (error) {
        next(error)
    }
}

export const getproposalbyname = async(req, res, next) => {
    const creator = req.params
    try {
        const proposalbyname = await Proposal.find(creator);


        res.status(200).json(proposalbyname);
    } catch (error) {
        next(error)
    }
}

/* updating the post */
export const updateProposal = async(req, res) => {
    const { id } = req.params;
    const { title, abstract, problem_statement, objective, tags, creator } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No proposal with that id`);
    try{
        const updatedProposal = { creator, title, abstract, problem_statement, tags, objective, };

        await Proposal.findByIdAndUpdate(id, updatedProposal, { new: true });
    
        res.json(updatedProposal);
    }catch(error){
        console.log(error)
    }

  
}

/* deleting the post */

export const deleteProposal = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No proposal with id: ${id}`);

    await Proposal.findByIdAndRemove(id);

    res.json({ message: "proposal deleted successfully." });
}
