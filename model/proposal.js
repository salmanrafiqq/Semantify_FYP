import mongoose from 'mongoose';

const proposalSchema = mongoose.Schema({
    title: String,
    abstract: String,
    problem_statement: String,
    objective: String,
    tags: [String],
    creator: String,

    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Proposal = mongoose.model('Proposal', proposalSchema);

export default Proposal;
