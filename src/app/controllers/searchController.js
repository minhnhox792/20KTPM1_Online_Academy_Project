import Courses from "../models/Courses.js"

const searchController = {
    searchHandle: async (req, res) => {
        try {
            const dataInput = req.query.searchInput
            const searchData = await Courses.find(
                // { $text: { $search: dataInput, $caseSensitive: true } }
                { category: { $regex: dataInput, $options: "$i" } }
            ).sort({ "createdAt": 1 })
            return res.render("Search/Search", {
                searchData
            })
        } catch (err) {
            console.log("Err: ", err)
            return res.send(err)
        }
    },
    pagination: async (req, res) => { 
        // /courses?page=5
    //    const totalPage = await Courses.count()
        const pageNumber = req.query.page // 5
        const nPerPage = 10;
        const pageData =  Courses.find()
            .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
            .limit(nPerPage)
        
        
        return pageData;

    }
}

export default searchController