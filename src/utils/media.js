const firstNonEmptyString = (...values) =>
    values.find(value => typeof value === "string" && value.trim().length > 0) || null;

export const getProfileAvatar = (entity) => {
    if (!entity) return null;

    return firstNonEmptyString(
        entity.avatarUrl,
        entity.avatar,
        entity.refereeAvatar,
        entity.jockeyAvatar,
        entity.profilePicture,
        entity.photoUrl,
        entity.user?.avatarUrl,
        entity.user?.avatar,
        entity.profile?.avatarUrl,
        entity.profile?.avatar
    );
};

export const getHorseImage = (horse) => {
    if (!horse) return null;

    return firstNonEmptyString(
        horse.imageUrl,
        horse.horseAvatar,
        horse.avatarUrl,
        horse.avatar,
        horse.photoUrl
    );
};
