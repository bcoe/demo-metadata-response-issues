# Demonstrates Performance Issues With Metadata Server

This repo demonstrates performance issues interacting with the metadata server
if `gcp-metadata` has caching turned off.

I deployed this library to `europe-west3` and with `CONCURRENCY` set to 25
all connections to the metadata server fail for me. At 15, the failure  is
more intermittent.

Even though this is somewhat contrived, a couple thoughts:

* perhaps folks are deploying several functions at the same time, and they
  contend for access to the metadata server?
* perhaps connections are being made from a shared instance?
* Node.js users tend to run several of our libraries, e.g., storage, kms,
  datastore, creating situations in which perhaps this behavior is more likely
  to crop up.