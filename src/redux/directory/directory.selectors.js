import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    [ selectDirectory ],
    directory => directory.sections
);

export const selectADirectorySection = sectionName  =>
    createSelector(
        [ selectDirectorySections ],
        sections => sections[sectionName]
    );