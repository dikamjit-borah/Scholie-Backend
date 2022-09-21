module.exports = {
    validatePublishedAt: function (publishedAt) {
        if (publishedAt && !isNaN(publishedAt) && (publishedAt == 0 || publishedAt == 1)) return publishedAt
        return null
    },

    validateStatus: function (status) {
        if (status && !isNaN(status) && (status == 0 || status == 1 || status == 2)) return status
        return null
    },

}