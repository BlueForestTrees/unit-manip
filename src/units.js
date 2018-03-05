import _ from 'lodash';

export const initUnits = grandeurs => {

    _.forEach(grandeurs, (units, grandeurName) => {
        _.forEach(units, unit => unit.grandeur = grandeurName);
        grandeurs[grandeurName] = _.sortBy(units, 'coef');
    });

    const units = _.chain(grandeurs).values().flatten().keyBy('shortname').value();

    return {
        units,
        grandeurs,
        grandeursKeys: Object.keys(grandeurs),
        shortnames: Object.keys(units)
    };

};