const proxyquire = require( 'proxyquire' );

describe( 'The ./lib/expandNamespaces function', ()=>{

  const expandNamespaces = proxyquire( '../lib/expandNamespace', {
    './loadNamespaces': sinon.stub().returns(
      { namespaces: { somePath: '/somePath/' } } )
  } );

  it( 'should keep paths without namespaces unchanged', ()=>{

    const expected = './somePath';
    const actual   = expandNamespaces( expected );

    expect( actual ).to.equal( expected );

  } );

  it( 'should change paths with namespaces', ()=>{

    const original = '<somePath>';
    const actual   = expandNamespaces( original, process.cwd() );

    expect( actual ).not.equal( original );

  } );

  it( 'should return the relativePath', ()=>{

    const newPath = expandNamespaces( '<somePath>', process.cwd() );

    expect( newPath ).to.equal( './somePath' );

  } );

} );
