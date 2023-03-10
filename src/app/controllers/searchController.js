
import Courses from "../models/Courses.js"
const keyWord = {
    boxName: "",
    boxCate: "",
    orderBy: "",
}
let dataInput
let ncheck
let ccheck
const nPerPage = 3
const searchController = {
    searchHandle: async (req, res) => {
        try {
            dataInput = req.query.searchInput || ""
            const pageNumber = req.query.pageNumber - "0"
            let searchData = null
            let countPage

            if (keyWord.boxName === "on" && keyWord.boxCate === "on") {
                ncheck = true,
                    ccheck = true,
                    searchData = await Courses.find(
                        { $text: { $search: dataInput } }
                    ).sort({ [keyWord.orderBy[0]]: keyWord.orderBy[1] - "0" })
                        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                        .limit(nPerPage)
                countPage = Math.floor (await Courses.find(
                    { $text: { $search: dataInput } }).count()/4)
            }
            else if (keyWord.boxName === "on") {
                ncheck = true,
                    ccheck = false,
                    searchData = await Courses.find(
                        { name: { $regex: dataInput, $options: "$i" } }
                    ).sort({ [keyWord.orderBy[0]]: keyWord.orderBy[1] - "0" })
                        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                        .limit(nPerPage)
                countPage = Math.floor(await Courses.find(
                    { name: { $regex: dataInput, $options: "$i" } }
                ).count()/4)
            }
            else if (keyWord.boxCate === "on") {
                ccheck = true,
                    ncheck = false,
                    searchData = await Courses.find(
                        { category: { $regex: dataInput, $options: "$i" } }
                    ).sort({ [keyWord.orderBy[0]]: keyWord.orderBy[1] - "0" })
                        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                        .limit(nPerPage)
                countPage = Math.floor(await Courses.find(
                    { category: { $regex: dataInput, $options: "$i" } }
                ).count()/4)
            }
            else {
                ncheck = false
                ccheck = false
                searchData = await Courses.find(
                    { $text: { $search: dataInput } }
                ).sort({ [keyWord.orderBy[0]]: keyWord.orderBy[1] - "0" })
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(nPerPage)
                countPage = Math.floor(await Courses.find(
                    { $text: { $search: dataInput } }).count()/4)
            }
            searchData = searchData.map((value) => {
                value.participant = value.studentList.length
                return value
            })
            let checkpag = false;
            console.log(countPage)
            if (pageNumber > countPage) {
                checkpag = true
            }
            return res.render("Search/Search", {
                dataInput,
                searchData,
                ncheck: JSON.stringify(ncheck),
                ccheck: JSON.stringify(ccheck),
                orderby: keyWord.orderBy[1],
                pageNumber,
                countPage,
                checkpag,

            })
        } catch (err) {
            console.log("Err: ", err)
            return res.send(err)
        }
    },
    postCourse: async (req, res) => {
        try {
            keyWord.boxCate = req.body.checkboxcategory
            keyWord.boxName = req.body.checkboxname
            keyWord.orderBy = req.body?.orderby.split(" ")
            return res.redirect(`/search?searchInput=${dataInput}&pageNumber=1`)

        } catch {
            return res.redirect("home")
        }
    },
}

export default searchController