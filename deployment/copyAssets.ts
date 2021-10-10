import * as shell from "shelljs";

// Copy all

// shell.mkdir( "dist/config" );
// shell.mkdir( "dist/public" );
shell.cp( "-R", "openapi.yml", "dist/" );
// shell.cp( "-R", "public/swagger.json", "dist/public/" );
