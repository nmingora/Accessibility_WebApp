import React from 'react';
import Layout from './Layout';
import "./AboutUs.css";
import imageSrc from './Partnerships.png'; // Import your image file

const AboutUs = () => {
    return (
      <Layout>
        <h2 className="title">Information</h2>
        <div className="table-container">
          <table className="table">
            <tbody>
              <tr>
                <td className="cell">O.L.L.I.</td>
                <td className="cell">CHEER Group</td>
                <td className="cell">CHEER Connections</td>
                <td className="cell">CHEER Works</td>
              </tr>
              <tr>
                <td className="cell">Ongoing Living & Learning
Inc. is a registered
not-for-profit caregiver
driven company with three
areas of focus: Cheer
Group; Cheer Works;
Cheer Connections.
Vision Statement–
To be a community of
inclusion and a circle of
friendship that supports
and enhances the lives of
our loved ones with
intellectual disabilities as
well as the whole family.</td>
                <td className="cell">CHEER Group consists of
families caring for an adult
with higher functioning
intellectual disabilities. We
pool our resources to
share in hiring support
workers on a 4:1 ratio.
We have the beautiful
facilities of Rock Glen
Family Resort at our
fingertips. This includes
an indoor pool, sauna,
fitness center, hall, and
kitchen. Some of our
projects are integrated
with the wider community
and there are planned
special outings each
month. We focus on
building life skills, social
skills, and leisure skills.
We aim to build in as
much community inclusion
as possible with a focus
on the “normal”.
Attendees must be able to
look after their own
self-care needs.
</td>
                <td className="cell">Cheer Connections is a
group of parents and
caregivers, we are all in a
similar situation, knowing
of someone who has a
form of disability.
We meet at least once a
month to offer each other
support and share our
knowledge.
Our monthly meetings
have been funded by the
Ontario Caregivers
Association, which
provided a relaxing day, a
nice lunch, and great
guest speakers.
This group helps reduce
isolation for caregivers as
well. It is a requirement of
the CHEER Group that
family members become
involved with Cheer
Connections.</td>
                <td className="cell">CHEER Works employs
members of the CHEER
Group who have been
developing their job skills.
There are many different
jobs available considering
differing abilities.This is a
safe and assisted working
environment providing
paid employment for our
community members with
intellectual disabilities.
Caregivers and
community supporters
volunteer to help with this
initiative.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
            <h2 className='title-2'>Application Forms</h2>
            <p><a href="https://docs.google.com/document/d/1GbLAj8M7l4bvNb1Ljiis60jjp2myPwsi30-r5S9IxLU/edit">Photo / Video Consent Form</a></p>
            <p><a href="https://docs.google.com/document/d/1gL0ngKTv1L_JatlsQtNxpR8Km7WSkyxMvqJ4axz5ngY/edit?usp=sharing">Emergency Contact Form</a></p>
            <p><a href="https://docs.google.com/document/d/1YaYnbaQxPrdH0l1WNjBPEHsOrMVtw75J3lffd_Jt418/edit">Participant Profile</a></p>
            <p><a href="https://drive.google.com/file/d/1tfAvM3N1_vVPeQNnJPSCZzcPpypDeoye/view">Rules & Guidelines</a></p>
            <p><a href="https://docs.google.com/document/d/1HK3m-dMIRXlUC_f0Mvy02WiULBoLTThw9saVUwg-tJY/edit">Code of Conduct</a></p>
        </div>
        <div>
        <h2 className="title-3">Partnerships</h2>
        </div>
        <div className="image-container">
            <img src={imageSrc}/>
          </div>
      </Layout>
    );
};

export default AboutUs;



