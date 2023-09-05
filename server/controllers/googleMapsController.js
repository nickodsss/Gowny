const fetch = require('node-fetch');
const util = require('util');
const apikey = process.env.GOOGLE_MAPS_API_KEY;
const googleMaps = require('@google/maps');
const googleMapsClient = googleMaps.createClient({ key: apikey });
const { Store, Dress, Image, Favorite } = require('../models')
const dress = require('../sampleData/dress.json')
dress.forEach(((el) => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
}))
const image = require('../sampleData/image.json')
image.forEach((el) => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
})

const Redis = require('ioredis')

const redis = new Redis(13795, process.env.REDIS)

class GoogleMapsController {

    static async readShop(req, res, next) {
        const placesPromise = util.promisify(googleMapsClient.places).bind(googleMapsClient);
        try {
            let mapCache = await redis.get("mapCache");

            if (mapCache) {
                let mapResult = JSON.parse(mapCache);
                return res.status(200).json(mapResult)
            }
            const response = await placesPromise({
                query: 'wedding dress rental',
                location: [-6.301455519188383, 106.65049435312483],
                radius: 5000
            });

            response.json.results.forEach(async (el) => {
                const result = await Store.findOrCreate({
                    where: {
                        name: el.name,
                        address: el.formatted_address,
                        lat: String(el.geometry.location.lat),
                        long: String(el.geometry.location.lng)
                    },
                    defaults: {
                        name: el.name,
                        address: el.formatted_address,
                        lat: el.geometry.location.lat,
                        long: el.geometry.location.lng
                    }
                })
                return result
            })



            await Dress.bulkCreate(dress)
            await Image.bulkCreate(image)

            redis.set("mapCache", JSON.stringify(response.json.results));
            res.status(200).json(response.json.results);
        } catch (err) {
            next(err)
        }
    }

    // static async readDirection(req, res, next) {
    //     const directionsRequest = {
    //         origin: {
    //             lat: req.body.origin.lat,
    //             lng: req.body.origin.lng
    //         },
    //         destination: {
    //             lat: req.body.destination.lat,
    //             lng: req.body.destination.lng
    //         },
    //         mode: 'driving'
    //     };

    //     googleMapsClient.directions(directionsRequest, (err, response) => {
    //         if (!err) {
    //             res.status(200).json(response.json)
    //         } else {
    //             // console.error(err);
    //             next(err)
    //         }
    //     });
    // }

    // static async readPlacePhoto(req, res, next) {
    //     try {
    //         const photoBaseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
    //         const maxWidth = 400; // You can set this to whatever you like
    //         const url = `${photoBaseUrl}?maxwidth=${maxWidth}&photoreference=${req.params.photo_reference}&key=${apikey}`;

    //         // we are redirecting the request to the actual photo url
    //         // the client will be able to use this route as if it were a direct link to the image
    //         res.redirect(url);
    //     } catch (err) {
    //         // console.error(err);
    //         next(err)
    //     }
    // }

    // static async readPlaceDetail(req, res, next) {
    //     try {
    //         const { placeId } = req.params;
    //         const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apikey}`);

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch place details');
    //         }

    //         const data = await response.json();

    //         const placeDetails = data.result;
    //         res.status(200).json(placeDetails);
    //     } catch (err) {
    //         // console.error('Error fetching place details:', err);
    //         next(err)
    //     }
    // }
}

module.exports = GoogleMapsController