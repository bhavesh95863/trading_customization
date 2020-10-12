# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in trading_customization/__init__.py
from trading_customization import __version__ as version

setup(
	name='trading_customization',
	version=version,
	description='Trading Customization',
	author='Bhavesh',
	author_email='maheshwaribhavesh95863@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
