class ResponseHelper {
    static success(res, data, message = 'Success') {
        // return {
        //     status: 200,
        //     body: {
        //         success: true,
        //         message,
        //         data,
        //     },
        // };
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    }

    static error(res, message = 'Error', statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
        });
    }

    static notFound(res, message = 'Not Found') {
        return this.error(res, message, 404);
    }

    static unauthorized(res,  message = 'Unauthorized') {
        return this.error(res, message, 401);
    }

    static pagination(res, data, page, limit, total, message = 'Success') {
        const totalPages = Math.ceil(total / limit);
        const currentPage = page;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        return res.status(200).json({
            success: true,
            message,
            data: {
                items: data,        
                total,    
                totalPages,   
                currentPage,   
                nextPage,     
                prevPage,    
                limit
            }
        });
    }

    static validationError(res, message = 'Not Found') {
        return res.status(400).json({
            success: false,
            message,
        });
    }

    static created(res, data, message = 'Created') {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    }
}

export default ResponseHelper;