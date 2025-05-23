/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnanf = require( '@stdlib/math-base-assert-is-nanf' );
var isPositiveZerof = require( '@stdlib/math-base-assert-is-positive-zerof' );
var PINF = require( '@stdlib/constants-float32-pinf' );
var NINF = require( '@stdlib/constants-float32-ninf' );
var EPS = require( '@stdlib/constants-float32-eps' );
var randu = require( '@stdlib/random-base-randu' );
var tryRequire = require( '@stdlib/utils-try-require' );


// VARIABLES //

var heavisidef = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( heavisidef instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof heavisidef, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `0` if `x` is negative', opts, function test( t ) {
	var x;
	var v;
	var i;

	for ( i = 0; i < 1e3; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		v = heavisidef( x );
		t.strictEqual( isPositiveZerof( v ), true, 'returns expected value' );
	}
	t.end();
});

tape( 'the function returns `1` if `x` is positive', opts, function test( t ) {
	var x;
	var v;
	var i;

	for ( i = 0; i < 1e3; i++ ) {
		x = ( randu()*100.0 ) + EPS;
		v = heavisidef( x );
		t.strictEqual( v, 1.0, 'returns expected value' );
	}
	t.end();
});

tape( 'by default, the function returns `NaN` if provided `+-0`', opts, function test( t ) {
	var v;

	v = heavisidef( -0.0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	v = heavisidef( +0.0 );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if the `continuity` option is `discontinuous`, the function returns `NaN` if provided `+-0`', opts, function test( t ) {
	var v;

	v = heavisidef( -0.0, 'discontinuous' );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	v = heavisidef( +0.0, 'discontinuous' );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if the `continuity` option is `half-maximum`, the function returns `0.5` if provided `+-0`', opts, function test( t ) {
	var v;

	v = heavisidef( -0.0, 'half-maximum' );
	t.strictEqual( v, 0.5, 'returns expected value' );

	v = heavisidef( +0.0, 'half-maximum' );
	t.strictEqual( v, 0.5, 'returns expected value' );

	t.end();
});

tape( 'if the `continuity` option is `left-continuous`, the function returns `0.0` if provided `+-0`', opts, function test( t ) {
	var v;

	v = heavisidef( -0.0, 'left-continuous' );
	t.strictEqual( isPositiveZerof( v ), true, 'returns expected value' );

	v = heavisidef( +0.0, 'left-continuous' );
	t.strictEqual( isPositiveZerof( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if the `continuity` option is `right-continuous`, the function returns `1` if provided `+-0`', opts, function test( t ) {
	var v;

	v = heavisidef( -0.0, 'right-continuous' );
	t.strictEqual( v, 1, 'returns expected value' );

	v = heavisidef( +0.0, 'right-continuous' );
	t.strictEqual( v, 1, 'returns expected value' );

	t.end();
});

tape( 'if the `continuity` option is not valid, the function returns `NaN` if provided `+-0`', opts, function test( t ) {
	var v;

	v = heavisidef( -0.0, 'foo' );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	v = heavisidef( +0.0, 'bar' );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var v = heavisidef( NaN, 'left-continuous' );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `0` if provided `-infinity`', opts, function test( t ) {
	var v = heavisidef( NINF, 'left-continuous' );
	t.strictEqual( v, 0.0, 'returns expected value' );
	t.end();
});

tape( 'the function returns `+1` if provided `+infinity`', opts, function test( t ) {
	var v = heavisidef( PINF, 'left-continuous' );
	t.strictEqual( v, 1.0, 'returns expected value' );
	t.end();
});
