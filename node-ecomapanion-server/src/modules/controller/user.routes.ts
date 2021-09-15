import express, { NextFunction, Request, Response } from "express";
import validateDTO from "../../@base/middleware/validateDTO.middleware";
import CreateUserDto from "../model/user/user.dto";
import UserService from "../service/user.service";

/**
 * Router Definition
 */
export const router = express.Router();

const path = "/user";
const service = new UserService();


// middleware

/**
 * This function comment is middleware for all
 */
router.use(function (req, res, next) {
  console.log('Request URL:', req.originalUrl + ' at ' + Date.now())
  next()
});


/**
 * @swagger
 * paths:
 *  /user/{id}:
 *   get:
 *     summary: Gets a object by ID.
 *     description: >
 *      A detailed description of the operation.
 *      Use markdown for rich text representation,
 *      such as **bold**, *italic*, and [links](https://swagger.io/docs/specification/describing-parameters/).
 *     parameters:
 *      - in: path
 *        name: ID
 *        required: true
 *        schema:
 *         type: string
 *         format: uuid
 *        description: The user ID
 *        example: USER123
 *     responses:
 *       '200':
 *         description: return an object
 */
router.get(`${path}/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const item: any = await service.get(id);
    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


/**
 * @swagger
 * /user:
 *   get:
 *     description: This function return all object
 *     responses:
 *       '200':
 *         description: return array of object
 */
router.get(`${path}`, async (req: Request, res: Response) => {
  try {
    const items: any = await service.getAll();
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a object.
 *     consumes:
 *      application/json
 *     responses:
 *       201:
 *         description: Created
*/
router.post(`${path}`, validateDTO(CreateUserDto), async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const items: any = await service.create(body);

    res.status(201).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


/**
 * @swagger
 * /user/:id:
 *   put:
 *     description: update object
 *     responses:
 *       '200':
 *         description: return object
 */
router.put(`${path}/:id`, validateDTO(CreateUserDto), async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const items: any = await service.update(id,body);

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});



/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     description: delete object with id
 */
router.delete(`${path}/:id`, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const items: any = await service.deleteWithID(id);

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});