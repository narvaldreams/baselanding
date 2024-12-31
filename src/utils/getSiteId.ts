const getSiteId = (): string => {
    const siteId = process.env.SITE_ID;

    if (!siteId) {
        throw new Error('SITE_ID environment variable is not defined');
    }

    return siteId;
};

export const siteId = getSiteId();

export default siteId;