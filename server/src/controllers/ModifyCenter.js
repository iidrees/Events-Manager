import { Centers } from '../models';
/**
 * A class that allows an admin modify a center they added
 * @export
 * @class ModifyCenter
 */
export default class ModifyCenter {
  /**
   * A method that allows an admin edit a center
   * @static
   * @param {any} req {request object}
   * @param {any} res {response object}
   * @returns {*} JSON
   * @memberof ModifyCenter
   */
  static editCenter(req, res) {
    const {
      name,
      location,
      address,
      status,
      owner,
      capacity,
      description,
      imgUrl
    } = req.body;
    const { admin } = req.decoded;
    const { centerId } = req.params;
    if (admin === false) {
      return res.status(403).send({
        status: 'Unsuccessful',
        message: 'You are not permitted to edit or modify this resource'
      });
    }
    return Centers
      .findOne({
        where: {
          id: centerId
        }
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            status: 'Unsuccessful',
            message: 'Center Not Found'
          });
        }
        return center
          .update({
            name: name || center.name,
            location: location || center.location,
            address: address || center.address,
            status: status || center.status,
            owner: owner || center.owner,
            capacity: capacity || center.capacity,
            description: description || center.description,
            imgUrl: imgUrl || center.imgUrl
          })
          .then(updateCenter => res.status(201).send({
            status: 'Success',
            message: 'Center successfully updated',
            data: updateCenter
          }))
      })
      .catch(() => res.status(422).send({
        status: 'Unsuccessful',
        message: 'Please input correct value'
      }));
  }
}
