import {
	joinPath, 
	pkg, 
} from './fs.mjs'

const workspaceDir     = pkg.dir
const workspacePkg     = joinPath( workspaceDir, 'package.json' )
const workflowsDir    = joinPath( workspaceDir, '.github', 'workflows' )
const packagesDir      = joinPath( workspaceDir, 'packages' )
const tempDir          = joinPath( workspaceDir, '__temp__' )
const documentationDir = joinPath( workspaceDir, 'docs' )
const todoDir          = joinPath( documentationDir, 'todo' )
const devDir           = joinPath( workspaceDir, '.dev' )

const coreDir = joinPath( packagesDir, 'core' )
const corePkg = joinPath( coreDir, 'package.json' )

const libDir = joinPath( packagesDir, 'clippo' )
const libPkg = joinPath( libDir, 'package.json' )

const docsDir = joinPath( packagesDir, 'docs' )
const docsPkg = joinPath( docsDir, 'package.json' )

const createDir = joinPath( packagesDir, 'create' )
const createPkg = joinPath( createDir, 'package.json' )

const confDir = joinPath( packagesDir, '_config' )
const confPkg = joinPath( confDir, 'package.json' )

const utilsDir = joinPath( packagesDir, 'utils' )
const utilsPkg = joinPath( confDir, 'package.json' )

export const paths = {
	tempDir,
	utilsDir,
	utilsPkg,
	createDir,
	createPkg,
	workspaceDir,
	workspacePkg,
	packagesDir,
	workflowsDir,
	documentationDir,
	todoDir,
	devDir,
	coreDir,
	corePkg,
	libDir,
	libPkg,
	confDir,
	confPkg,
	docsDir,
	docsPkg,
}
