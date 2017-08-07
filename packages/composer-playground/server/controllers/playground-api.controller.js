const RegClient = require('npm-registry-client');
const client = new RegClient();
const tar = require('tar');
const httpstatus = require('http-status');

export class PlaygroundController {

    downloadBna(req, res) {
        let chosenSample = req.query;
        // Download the package tarball.
        console.log('chosenSample ', chosenSample);
        const newTarball = chosenSample.tarball.replace('35.164.104.24','ec2-35-164-104-24.us-west-2.compute.amazonaws.com');
        // console.log('newTarball', newTarball);
        client.fetch(newTarball, {}, (error, stream) => {
        // client.fetch(chosenSample.tarball, {}, (error, stream) => {
            if (error) {
                return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({error : error});
            }

            // Set up a tar parser that selects BNA files.
            const tarParse = new tar.Parse({
                filter : (path) => {
                    return path.match(/\.bna$/);
                }
            });

            // Go through every entry.
            const pipe = stream.pipe(tarParse);
            pipe.on('entry', (entry) => {
                // LOG.debug(method, 'Found business network archive in package', entry.path);
                let buffer = Buffer.alloc(0);
                entry.on('data', (data) => {
                    // Collect the data.
                    buffer = Buffer.concat([buffer, data]);
                });
                entry.on('end', () => {
                    // LOG.exit(method, null);
                    res.set({
                        'Content-Type' : 'text/plain; charset=x-user-defined',
                    });
                    return res.send(buffer);
                });
            });
        });
    }

}