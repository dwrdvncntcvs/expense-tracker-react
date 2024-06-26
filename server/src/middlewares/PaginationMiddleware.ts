import { RequestHandler } from "express"

class PaginationMiddleware {
    isPaginated: RequestHandler = async (req, res, next) => {
        const { page, limit } = req.query

        console.log("Query: ", req.query)

        if (page && limit) {
            req.pagination.page = page ? +page : 1
            req.pagination.offset = page ? (+page - 1) * +limit : 0
            req.pagination.limit = limit ? +page : 10
        }

        return next()
    }
}

export default PaginationMiddleware